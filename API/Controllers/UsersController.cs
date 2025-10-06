using System;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize]
public class UsersController(IUserRepository userRepository) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDto>>> GetMembers()
    {
        var members = await userRepository.GetMembersAsync();

        return Ok(members);
    }

    [HttpGet("{username}")] // /api/users/yonos
    public async Task<ActionResult<MemberDto?>> GetUser(string username)
    {
        var user = await userRepository.GetUserByUsernameAsync(username);
        if (user == null) return NotFound();
        return user.ToMemberDto();
    }

}
