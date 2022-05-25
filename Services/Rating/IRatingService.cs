using chatServer.Models;

namespace Services.Rating
{
    public interface IRatingService
    {
        public List<chatServer.Models.Rating> GetAll();
        public chatServer.Models.Rating Get(int id);
        public void Delete(int Id);
        public void Add(int star, string name, string review );

        public void Update(chatServer.Models.Rating rating);

        public int AverageStars();
    }
}