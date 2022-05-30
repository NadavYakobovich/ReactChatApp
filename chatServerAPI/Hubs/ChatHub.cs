using Domain;
using Microsoft.AspNetCore.SignalR;

namespace chatServerAPI.Hubs;

public class ChatHub : Hub
{
    public static IDictionary<string, string> ConnectionsDict = new Dictionary<string, string>();

    public async Task AddUser(string username)
    {
        if (ConnectionsDict.ContainsKey(username))
        {
            ConnectionsDict.Remove(username);
        }

        ConnectionsDict.Add(username, Context.ConnectionId);
    }

    public async Task SendMessage(string username, string message, string time)
    {
        string connectionId;
        if (ConnectionsDict.ContainsKey(username))
        {
            connectionId = ConnectionsDict[username];
            await Clients.Client(connectionId).SendAsync("ReceiveMessage", username, message, time);

        }
    }
    public override Task OnDisconnectedAsync(Exception exception)
    {
        var userID = ConnectionsDict.FirstOrDefault(x => x.Value == Context.ConnectionId).Key;
        if (ConnectionsDict.ContainsKey(userID))
        {
            ConnectionsDict.Remove(userID);
        }

        return base.OnDisconnectedAsync(exception);
    }
}