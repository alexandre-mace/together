<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Behavior\Timestampable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\MaxDepth;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ApiResource(
 *     attributes={
 *         "normalization_context"={"groups"={"user:read"}, "enable_max_depth"=true},
 *     },
 * )
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 * @ORM\Table(name="app_user")
 * @UniqueEntity("email")
 * @ApiFilter(SearchFilter::class, properties={"email": "exact"})
 */
class User implements UserInterface
{
    use Timestampable;

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"user:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Assert\Email
     * @Assert\NotBlank
     * @Groups({"user:read"})
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     * @Groups({"user:read"})
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     * @Assert\NotBlank
     * @Groups({"user:read"})
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank
     * @Groups({"user:read", "event:read"})
     */
    private $name;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Event", mappedBy="interests")
     * @Groups({"user:read"})
     * @MaxDepth(1)
     */
    private $interestedEvents;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Event", mappedBy="participants")
     * @Groups({"user:read"})
     * @MaxDepth(1)
     */
    private $participatedEvents;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Event", mappedBy="organizator")
     * @Groups({"user:read"})
     */
    private $organizedEvents;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"user:read", "event:read"})
     */
    private $contactEmail;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"user:read", "event:read"})
     */
    private $contactPhone;

    public function __construct()
    {
        $this->interestedEvents = new ArrayCollection();
        $this->participatedEvents = new ArrayCollection();
        $this->organizedEvents = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection|Event[]
     */
    public function getInterestedEvents(): Collection
    {
        return $this->interestedEvents;
    }

    public function addInterestedEvent(Event $interestedEvent): self
    {
        if (!$this->interestedEvents->contains($interestedEvent)) {
            $this->interestedEvents[] = $interestedEvent;
            $interestedEvent->addInterest($this);
        }

        return $this;
    }

    public function removeInterestedEvent(Event $interestedEvent): self
    {
        if ($this->interestedEvents->contains($interestedEvent)) {
            $this->interestedEvents->removeElement($interestedEvent);
            $interestedEvent->removeInterest($this);
        }

        return $this;
    }

    /**
     * @return Collection|Event[]
     */
    public function getParticipatedEvents(): Collection
    {
        return $this->participatedEvents;
    }

    public function addParticipatedEvent(Event $participatedEvent): self
    {
        if (!$this->participatedEvents->contains($participatedEvent)) {
            $this->participatedEvents[] = $participatedEvent;
            $participatedEvent->addParticipant($this);
        }

        return $this;
    }

    public function removeParticipatedEvent(Event $participatedEvent): self
    {
        if ($this->participatedEvents->contains($participatedEvent)) {
            $this->participatedEvents->removeElement($participatedEvent);
            $participatedEvent->removeParticipant($this);
        }

        return $this;
    }

    /**
     * @return Collection|Event[]
     */
    public function getOrganizedEvents(): Collection
    {
        return $this->organizedEvents;
    }

    public function addOrganizedEvent(Event $organizedEvent): self
    {
        if (!$this->organizedEvents->contains($organizedEvent)) {
            $this->organizedEvents[] = $organizedEvent;
            $organizedEvent->setOrganizator($this);
        }

        return $this;
    }

    public function removeOrganizedEvent(Event $organizedEvent): self
    {
        if ($this->organizedEvents->contains($organizedEvent)) {
            $this->organizedEvents->removeElement($organizedEvent);
            // set the owning side to null (unless already changed)
            if ($organizedEvent->getOrganizator() === $this) {
                $organizedEvent->setOrganizator(null);
            }
        }

        return $this;
    }

    public function getContactEmail(): ?string
    {
        return $this->contactEmail;
    }

    public function setContactEmail(?string $contactEmail): self
    {
        $this->contactEmail = $contactEmail;

        return $this;
    }

    public function getContactPhone(): ?string
    {
        return $this->contactPhone;
    }

    public function setContactPhone(?string $contactPhone): self
    {
        $this->contactPhone = $contactPhone;

        return $this;
    }
}
