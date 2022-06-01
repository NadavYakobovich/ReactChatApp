using Domain;
using Microsoft.AspNetCore.SignalR;

namespace chatServerAPI.Hubs;

public class ChatHub : Hub
{
    public readonly static IDictionary<string, string> ConnectionsDict = new Dictionary<string, string>();

    public async Task AddUserToConnections(string username)
    {
        if (ConnectionsDict.ContainsKey(username))
        {
            ConnectionsDict.Remove(username);
        }

        ConnectionsDict.Add(username, Context.ConnectionId);
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