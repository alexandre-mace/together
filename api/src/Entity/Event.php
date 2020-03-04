<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\MaxDepth;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *     attributes={
 *         "normalization_context"={"groups"={"event:read"}, "enable_max_depth"=true},
 *     },
 * )
 * @ORM\Entity(repositoryClass="App\Repository\EventRepository")
 */
class Event
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"user:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank
     * @Groups({"user:read", "event:read"})
     */
    private $name;

    /**
     * @ORM\Column(type="datetime")
     * @Assert\NotBlank)
     * @Groups({"user:read", "event:read"})
     */
    private $date;

    /**
     * @ORM\Column(type="text")
     * @Assert\NotBlank
     * @Groups({"user:read", "event:read"})
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank
     * @Groups({"user:read", "event:read"})
     */
    private $address;

    /**
     * @ORM\Column(type="float")
     * @Groups({"user:read", "event:read"})
     */
    private $latitude;

    /**
     * @ORM\Column(type="float")
     * @Groups({"user:read", "event:read"})
     */
    private $longitude;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\User", inversedBy="interestedEvents")
     * @ORM\JoinTable(name="event_interests")
     * @Groups({"user:read", "event:read"})
     * @MaxDepth(1)
     */
    private $interests;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\User", inversedBy="participatedEvents")
     * @ORM\JoinTable(name="event_participants")
     * @Groups({"user:read", "event:read"})
     * @MaxDepth(1)
     */
    private $participants;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="organizedEvents")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"user:read", "event:read"})
     * @MaxDepth(1)
     */
    private $organizator = null;

    public function __construct()
    {
        $this->interests = new ArrayCollection();
        $this->participants = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getLatitude(): ?float
    {
        return $this->latitude;
    }

    public function setLatitude(float $latitude): self
    {
        $this->latitude = $latitude;

        return $this;
    }

    public function getLongitude(): ?float
    {
        return $this->longitude;
    }

    public function setLongitude(float $longitude): self
    {
        $this->longitude = $longitude;

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getInterests(): Collection
    {
        return $this->interests;
    }

    public function addInterest(User $interest): self
    {
        if (!$this->interests->contains($interest)) {
            $this->interests[] = $interest;
        }

        return $this;
    }

    public function removeInterest(User $interest): self
    {
        if ($this->interests->contains($interest)) {
            $this->interests->removeElement($interest);
        }

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getParticipants(): Collection
    {
        return $this->participants;
    }

    public function addParticipant(User $participant): self
    {
        if (!$this->participants->contains($participant)) {
            $this->participants[] = $participant;
        }

        return $this;
    }

    public function removeParticipant(User $participant): self
    {
        if ($this->participants->contains($participant)) {
            $this->participants->removeElement($participant);
        }

        return $this;
    }

    public function getOrganizator(): ?User
    {
        return $this->organizator;
    }

    public function setOrganizator(?User $organizator): self
    {
        $this->organizator = $organizator;

        return $this;
    }
}
