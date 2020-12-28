#pragma once

#include <httplib.h>
#include <string>

namespace xal { namespace network { namespace http {
    class HTTPServer {
    public:
        static const std::string ARG__PORT;
        
    public:
        HTTPServer(const std::string& appPath, uint port);

        void run();

    private:
        void setStaticDir(const std::string_view appPath);

    private:
        httplib::Server m_server;
        uint            m_port;
    };
} } }