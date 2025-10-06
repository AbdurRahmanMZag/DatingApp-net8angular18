using System;
using API.DTOs;
using API.Extensions;

namespace API.Entities;

public class AppUser
{
    public int Id { get; set; }
    public required string UserName { get; set; }
    public byte[] PasswordHash { get; set; } = [];
    public byte[] PasswordSalt { get; set; } = [];
    public DateOnly DateOfBirth { get; set; }
    public required string KnownAs { get; set; }
    public DateTime Created { get; set; } = DateTime.UtcNow;
    public DateTime LastActive { get; set; } = DateTime.UtcNow;
    public required string Gender { get; set; }
    public string? Introduction { get; set; }
    public string? Interests { get; set; }
    public string? LookingFor { get; set; }
    public required string City { get; set; }
    public required string Country { get; set; }
    public List<Photo> Photos { get; set; } = [];

    public int GetAge()
    {
        return DateOfBirth.CalculateAge();
    }

    public MemberDto ToMemberDto()
    {
        return new MemberDto
        {
            Id = this.Id,
            UserName = this.UserName,
            KnownAs = this.KnownAs,
            Age = this.GetAge(),
            Gender = this.Gender,
            Created = this.Created,
            LastActive = this.LastActive,
            Introduction = this.Introduction,
            Interests = this.Interests,
            LookingFor = this.LookingFor,
            City = this.City,
            Country = this.Country,
            PhotoUrl = this.Photos.FirstOrDefault(p => p.IsMain)?.Url,
            Photos = this.Photos.Select(p => new PhotoDto
            {
                Id = p.Id,
                Url = p.Url,
                IsMain = p.IsMain
            }).ToList()
        };
    }
}
