using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TrelloModel;

namespace my_react_app.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TrelloController : ControllerBase
    {
        private readonly ILogger<TrelloController> _logger;
        public TrelloController(ILogger<TrelloController> logger)
        {
            _logger = logger;
        }
        private string JsonFileName {
            get { return $"{System.IO.Directory.GetCurrentDirectory()}/ClientApp/src/data/logs.json"; }
        }

        public IEnumerable<Trello> getLogs() {
            using(var jsonFileReader = System.IO.File.OpenText(JsonFileName)) {
                return JsonSerializer.Deserialize<Trello[]>(jsonFileReader.ReadToEnd(),
                    new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });
            }
        }

        [HttpPost]
        public void TrelloData( Trello data) {

            data.ShowValues();
            var logs = getLogs().ToList();
            

            logs.Add(data);

            using(var outputStream = System.IO.File.OpenWrite(JsonFileName))
            {
                JsonSerializer.Serialize<IEnumerable<Trello>>(
                    new Utf8JsonWriter(outputStream, new JsonWriterOptions
                    {
                        SkipValidation = true,
                        Indented = true
                    }), 
                    logs
                );
            }
        }
        [HttpHead]
        public Microsoft.AspNetCore.Mvc.OkResult GetHeadOkay() => Ok();
    }
}
