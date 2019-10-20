using System;

namespace TrelloModel {
    public class Model {
        public string id { get; set; }
        public string name { get; set; }
        public string desc { get; set; }
        public bool closed { get; set; }
        public string idOrganization { get; set; }
        public bool pinned { get; set; }
        public string url { get; set; }

       
    }

    public class ActionDataType {
        public string id { get; set; }
        public string name { get; set; }
        public int idShort { get; set; }
        public string shortLink { get; set; }
    }

    public class ActionData {
        public ActionDataType card { get; set; }
        public ActionDataType list { get; set; }
        public ActionDataType board { get; set; }
    }

    public class Action {
        public ActionData data { get; set; }
        public string type { get; set; }
    }

    public class Trello {
        public Model model {set;get;}
        public Action action { get; set; }
        public ActionDataType GetActionData(ActionDataType data)
        => data != null ? data : new ActionDataType();

        public void ShowValues() {
            ActionDataType card = GetActionData(action.data.card);
            ActionDataType list = GetActionData(action.data.list);
            ActionDataType board = GetActionData(action.data.board);
            Console.WriteLine("\nDATA\n");
            Console.WriteLine($"-=-=-= CARD =-=-=-\nid: {card.id}\nname: {card.name}\nshortLink: {card.shortLink}\nidShort: {card.idShort}");
            Console.WriteLine($"-=-=-= LIST =-=-=-\nid: {list.id}\nname: {list.name}\nshortLink: {list.shortLink}\nidShort: {list.idShort}");
            Console.WriteLine($"-=-=-= BOARD =-=-=-\nid: {board.id}\nname: {board.name}\nshortLink: {board.shortLink}\nidShort: {board.idShort}");
            Console.WriteLine("\n");
        }
        
    }
}
