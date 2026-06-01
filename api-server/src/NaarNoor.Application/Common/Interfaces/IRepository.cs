using System.Linq;

namespace NaarNoor.Application.Common.Interfaces;

public interface IRepository<TEntity>
    where TEntity : class
{
    IQueryable<TEntity> Query();
    void Add(TEntity entity);
    void Remove(TEntity entity);
    void Update(TEntity entity);
}
