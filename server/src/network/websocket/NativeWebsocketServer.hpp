#pragma once

#define ASIO_STANDALONE
#include <websocketpp/server.hpp>
#include <websocketpp/config/asio_no_tls.hpp>

namespace xal { namespace network { namespace websocket {
    typedef websocketpp::server<websocketpp::config::asio> NativeWebsocketServer;
} } }