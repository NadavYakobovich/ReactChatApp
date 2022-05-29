using Microsoft.AspNetCore.SignalR;

namespace chatServerAPI.Hubs;

public class ChatHub : Hub
{
    public static IDictionary<string, string> ConnectionsDict = new Dictionary<string, string>();

    public async Task AddUser(string username)
    {
        if (ConnectionsDict.TryGetValue(Context.ConnectionId, out username))
        {
            ConnectionsDict.Remove(username);
        }

        ConnectionsDict[username] = Context.ConnectionId;
    }
}