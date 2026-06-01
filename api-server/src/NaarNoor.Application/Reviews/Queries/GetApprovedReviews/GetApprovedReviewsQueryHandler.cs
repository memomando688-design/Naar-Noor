using MediatR;
using Microsoft.EntityFrameworkCore;
using NaarNoor.Application.Common.Interfaces;

namespace NaarNoor.Application.Reviews.Queries.GetApprovedReviews;

public class GetApprovedReviewsQueryHandler : IRequestHandler<GetApprovedReviewsQuery, List<ReviewDto>>
{
    private readonly IUnitOfWork _unitOfWork;

    public GetApprovedReviewsQueryHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<List<ReviewDto>> Handle(GetApprovedReviewsQuery request, CancellationToken cancellationToken)
    {
        return await _unitOfWork.Reviews.Query()
            .Where(r => r.IsApproved)
            .OrderByDescending(r => r.CreatedAt)
            .Select(r => new ReviewDto(
                r.Id,
                r.CustomerName,
                r.Rating,
                r.Comment,
                r.Source,
                r.CreatedAt
            ))
            .ToListAsync(cancellationToken);
    }
}
