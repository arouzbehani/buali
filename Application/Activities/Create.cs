using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistance;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }

        }
        public class Hnadler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Hnadler(DataContext context)
            {
                _context = context;

            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity);
                await _context.SaveChangesAsync();
                return Unit.Value; // Literally equals to nothing !:)
            }
        }
    }
}