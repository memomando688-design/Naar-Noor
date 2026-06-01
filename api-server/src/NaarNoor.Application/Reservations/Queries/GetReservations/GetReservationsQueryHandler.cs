using MediatR;
using Microsoft.EntityFrameworkCore;
using NaarNoor.Application.Common.Interfaces;

namespace NaarNoor.Application.Reservations.Queries.GetReservations;

public class GetReservationsQueryHandler : IRequestHandler<GetReservationsQuery, List<ReservationDto>>
{
    private readonly IUnitOfWork _unitOfWork;

    public GetReservationsQueryHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<List<ReservationDto>> Handle(GetReservationsQuery request, CancellationToken cancellationToken)
    {
        return await _unitOfWork.Reservations.Query()
            .OrderByDescending(r => r.ReservationDate)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(r => new ReservationDto(
                r.Id,
                r.CustomerName,
                r.Email,
                r.PhoneNumber,
                r.ReservationDate,
                r.ReservationTime.ToString("HH:mm"),
                r.PartySize,
                r.Status.ToString(),
                r.SpecialRequests,
                r.CreatedAt
            ))
            .ToListAsync(cancellationToken);
    }
}
