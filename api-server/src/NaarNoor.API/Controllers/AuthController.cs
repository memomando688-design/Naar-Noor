using Microsoft.AspNetCore.Mvc;
using NaarNoor.Application.Common.Interfaces;

namespace NaarNoor.API.Controllers;

/// <summary>
/// Handles Supabase-backed authentication: register, login, logout, password reset.
/// </summary>
[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly ISupabaseAuthService _auth;
    private readonly ILogger<AuthController> _logger;

    public AuthController(ISupabaseAuthService auth, ILogger<AuthController> logger)
    {
        _auth = auth;
        _logger = logger;
    }

    /// <summary>POST api/auth/register</summary>
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] AuthRequest req)
    {
        if (string.IsNullOrWhiteSpace(req.Email) || string.IsNullOrWhiteSpace(req.Password))
            return BadRequest(new { error = "Email and password are required." });

        var (success, userId, error) = await _auth.RegisterUserAsync(req.Email, req.Password);
        if (!success)
            return BadRequest(new { error });

        return Ok(new { userId });
    }

    /// <summary>POST api/auth/login</summary>
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] AuthRequest req)
    {
        if (string.IsNullOrWhiteSpace(req.Email) || string.IsNullOrWhiteSpace(req.Password))
            return BadRequest(new { error = "Email and password are required." });

        var (success, token, error) = await _auth.LoginUserAsync(req.Email, req.Password);
        if (!success)
            return Unauthorized(new { error });

        return Ok(new { access_token = token });
    }

    /// <summary>POST api/auth/logout</summary>
    [HttpPost("logout")]
    public async Task<IActionResult> Logout([FromBody] LogoutRequest req)
    {
        if (string.IsNullOrWhiteSpace(req.UserId))
            return BadRequest(new { error = "UserId is required." });

        var (success, error) = await _auth.LogoutUserAsync(req.UserId);
        if (!success)
            return BadRequest(new { error });

        return Ok(new { message = "Logged out successfully." });
    }

    /// <summary>POST api/auth/reset-password</summary>
    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest req)
    {
        if (string.IsNullOrWhiteSpace(req.Email))
            return BadRequest(new { error = "Email is required." });

        var (success, error) = await _auth.ResetPasswordAsync(req.Email);
        if (!success)
            return BadRequest(new { error });

        return Ok(new { message = "Password reset email sent." });
    }

    /// <summary>GET api/auth/me — returns current user from Bearer token</summary>
    [HttpGet("me")]
    public async Task<IActionResult> Me()
    {
        var token = Request.Headers["Authorization"].FirstOrDefault()?.Replace("Bearer ", "");
        if (string.IsNullOrWhiteSpace(token))
            return Unauthorized(new { error = "No token provided." });

        var (success, userId, email, error) = await _auth.GetCurrentUserAsync(token);
        if (!success)
            return Unauthorized(new { error });

        return Ok(new { userId, email });
    }
}

public record AuthRequest(string Email, string Password);
public record LogoutRequest(string UserId);
public record ResetPasswordRequest(string Email);
