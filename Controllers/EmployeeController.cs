using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using EMS.Models;
using EMS.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace EMS.Controllers
{
    [Produces("application/json")]
    [Route("api/Employee")]
    public class EmployeeController:Controller        
    {
        private readonly EmployeeContext _context;
        public EmployeeController(EmployeeContext context)
        {
            _context = context;
        }
        [HttpPost]
        public IActionResult AddEmployee([FromBody]Employee empObj)
        {
            _context.Employee.Add(empObj);
            _context.SaveChanges();
            return Json("OK");


        }
        [HttpGet]
        public async Task<IActionResult>EmployeeList()
        {
            List<Employee_Project> ilIst = new List<Employee_Project>();
            var listData    = await (from emp in _context.Employee
                              join pro in _context.Project on emp.ProjectId equals pro.ProjectId
                              select new
                              {
                                  emp.EmployeeId,
                                  emp.EmployeeName,
                                  emp.Designation,
                                  pro.ProjectName
                              }
                              ).ToListAsync();
            listData.ForEach(x =>
            {
                Employee_Project obj = new Employee_Project();
                obj.EmployeeId = x.EmployeeId;
                obj.Designation = x.Designation;
                obj.EmployeeName = x.EmployeeName;
                obj.Project = x.ProjectName;
                ilIst.Add(obj);
            });

            return Json(ilIst);
        }
        [HttpGet("{Empid}")]
        public async Task<IActionResult> EmployeeDetails(int Empid)
        {
            var EmpDeatils = await (from emp in _context.Employee
                                    join pro in _context.Project on emp.ProjectId equals pro.ProjectId
                                    where emp.EmployeeId == Empid
                                    select new
                                    {
                                        emp.EmployeeId,
                                        emp.EmployeeName,
                                        emp.Designation,
                                        pro.ProjectName,
                                        emp.Skills,
                                        pro.ProjectId,
                                        pro.StartDate,
                                        pro.EndDate
                                    }
                                    ).FirstAsync();
            return Json(EmpDeatils);
        }
        [HttpDelete]
        public IActionResult RemoveEmployeeDetails([FromBody]int empId)
        {
            Employee Emp;
            Emp = _context.Employee.Where(x => x.EmployeeId == empId).First();
            _context.Employee.Remove(Emp);
            _context.SaveChanges();
            return Json("OK");

        }

        [HttpPut]
        public IActionResult EditEmployee([FromBody]Employee empData)
        {
            _context.Entry(empData).State = EntityState.Modified;
            _context.SaveChanges();
            return Json("ok");
        }
    }
}
