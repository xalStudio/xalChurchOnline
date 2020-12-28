#pragma once

#define ASIO_STANDALONE

#include <asio/io_context.hpp>
#include <string>
#include <functional>
#include <unordered_map>
#include <nlohmann/json.hpp>

#include "NativeWebsocketServer.hpp"

namespace xal { namespace network { namespace websocket {
    class WebsocketServer {
    public:
        static const std::string ARG__PORT;

    public:
        WebsocketServer();

        void initialize(uint port);
        int  run();

    private:
        void onMessage(websocketpp::connection_hdl hdl, NativeWebsocketServer::message_ptr msg);

    private:
        NativeWebsocketServer m_server;
        asio::io_context      m_io_context;
        uint                  m_port;
    };
} } }