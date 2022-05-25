using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using chatServer.Models;
using Services.Rating;

namespace chatServerAPP.Controllers;

public class RatingController : Controller
{
    // private readonly chatServerContext _context;
    private static IRatingService _service = new RatingService();



    // GET: Rating
    public async Task<IActionResult> Index()
    {
        ViewBag.average = _service.AverageStars();
        return _service.GetAll() != null ? 
            View( _service.GetAll()) :
            Problem("Entity set 'chatServerContext.Rating'  is null.");
    }

    // GET: Rating/Details/5
    public async Task<IActionResult> Details(int? id)
    {
        if (id == null )
        {
            return NotFound();
        }

        var rating =  _service.GetAll().Find(m => m.Id == id);
        if (rating == null)
        {
            return NotFound();
        }

        return View(rating);
    }

    // GET: Rating/Create
    public IActionResult Create()
    {
        return View();
    }

    // POST: Rating/Create
    // To protect from overposting attacks, enable the specific properties you want to bind to.
    // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create([Bind("Name,Review,Stars")] Rating rating)
    {
        // if (ModelState.IsValid) // need to check why its not work
        // {
        _service.Add(rating.Stars, rating.Name, rating.Review);
        return RedirectToAction(nameof(Index));
        // }
        // return View(rating); // return to the same page
    }

    // GET: Rating/Edit/5
    public async Task<IActionResult> Edit(int id)
    {
        if (id == null || _service.GetAll() == null)
        {
            return NotFound();
        }

        var rating =  _service.Get(id);
        if (rating == null)
        {
            return NotFound();
        }
        return View(rating);
    }

    // POST: Rating/Edit/5
    // To protect from overposting attacks, enable the specific properties you want to bind to.
    // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int id, [Bind("Id,Name,Review,Time,Stars")] Rating rating)
    {
        if (id != rating.Id)
        {
            return NotFound();
        }

        if (ModelState.IsValid)
        {
            try
            {
                _service.Update(rating);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RatingExists(rating.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return RedirectToAction(nameof(Index));
        }
        return View(rating);
    }

    // GET: Rating/Delete/5
    public async Task<IActionResult> Delete(int? id)
    {
        if (id == null || _service.GetAll() == null)
        {
            return NotFound();
        }

        var rating =  _service.GetAll()
            .Find(m => m.Id == id);
        if (rating == null)
        {
            return NotFound();
        }

        return View(rating);
    }

    // POST: Rating/Delete/5
    [HttpPost, ActionName("Delete")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteConfirmed(int id)
    {
        if (_service.GetAll() == null)
        {
            return Problem("Entity set 'chatServerContext.Rating'  is null.");
        }
        var rating =  _service.Get(id);
        if (rating != null)
        {
            _service.Delete(rating.Id);
        }
            
        return RedirectToAction(nameof(Index));
    }

    private bool RatingExists(int id)
    {
        return (_service.GetAll()?.Any(e => e.Id == id)).GetValueOrDefault();
    }


    public  async Task<IActionResult> Search(string search)
    {
        List<Rating> list = _service.GetAll();
        return View(nameof(search), list.Where(x=> x.Name.ToLower().Contains(search.ToLower())));
    }
 
}