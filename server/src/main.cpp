#include <memory>
#include <functional>
#include <iostream>
#include <thread>

#include "network/websocket/WebsocketServer.hpp"
#include "network/http/HTTPServer.hpp"
#include "utils/CmdArguments.hpp"

// static const std::string ARG__ONLY_LOBBY = "--only-lobby";

using namespace xal;

int main(int argc, char** argv) {
    utils::CmdArguments arguments(argc, argv);

    uint websocektPort,
         httpPort;

    if (!arguments.has(network::websocket::WebsocketServer::ARG__PORT)) {
        std::cerr << "Missing \"" << network::websocket::WebsocketServer::ARG__PORT << "\" argument\n";
        return 1;
    } else {
        websocektPort = std::stoi(std::string(arguments.get(network::websocket::WebsocketServer::ARG__PORT)));
    }

    if (!arguments.has(network::http::HTTPServer::ARG__PORT)) {
        std::cerr << "Missing \"" << network::http::HTTPServer::ARG__PORT << "\" argument\n";
        return 1;
    } else {
        httpPort = std::stoi(std::string(arguments.get(network::http::HTTPServer::ARG__PORT)));
    }

    network::http::HTTPServer httpServer(std::string(argv[0]), httpPort);
    network::websocket::WebsocketServer websocketServer;

    websocketServer.initialize(websocektPort);

    // if (!arguments.has(system::session::Room::ARG__GAME_DIR)) {
    //     std::cerr << "Missing \"--game-dir\" argument\n";
    //     return 1;
    // }

    // system::session::Room room;
    // room.setGame(arguments.get(system::session::Room::ARG__GAME_DIR));
    
    // using namespace std::placeholders;
    // server.addMessagesHandler("", std::bind(&system::session::Room::onMessage, &room, _1, _2, _3));

    // std::thread t(std::bind(&system::session::Room::run, &room));

    // server.run();
    // t.join();

    std::thread httpServerThread(std::bind(&network::http::HTTPServer::run, &httpServer));
    websocketServer.run();

    httpServerThread.join();

    return 0;
}