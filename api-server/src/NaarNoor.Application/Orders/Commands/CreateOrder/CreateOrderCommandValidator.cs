using FluentValidation;

namespace NaarNoor.Application.Orders.Commands.CreateOrder;

public class CreateOrderCommandValidator : AbstractValidator<CreateOrderCommand>
{
    public CreateOrderCommandValidator()
    {
        RuleFor(x => x.CustomerName).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Email).NotEmpty().EmailAddress().MaximumLength(200);
        RuleFor(x => x.PhoneNumber).NotEmpty().MaximumLength(20);
        RuleFor(x => x.Type).NotEmpty().Must(t => t == "collection" || t == "delivery")
            .WithMessage("Type must be 'collection' or 'delivery'.");
        RuleFor(x => x.Items).NotEmpty().WithMessage("Order must contain at least one item.");
        RuleForEach(x => x.Items).ChildRules(item =>
        {
            item.RuleFor(i => i.MenuItemId).NotEmpty();
            item.RuleFor(i => i.MenuItemName).NotEmpty().MaximumLength(150);
            item.RuleFor(i => i.UnitPrice).GreaterThan(0);
            item.RuleFor(i => i.Quantity).GreaterThan(0).LessThanOrEqualTo(20);
        });
        When(x => x.Type == "delivery", () =>
        {
            RuleFor(x => x.DeliveryAddress).NotEmpty().MaximumLength(300)
                .WithMessage("Delivery address is required for delivery orders.");
        });
    }
}
