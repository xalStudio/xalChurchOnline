#include "HTTPServer.hpp"

#include <filesystem>

namespace xal { namespace network { namespace http {
    const std::string HTTPServer::ARG__PORT = "--http-port";

    HTTPServer::HTTPServer(const std::string& appPath, uint port) 
        : m_port { port }
    {
        setStaticDir(appPath);

        // m_server.Get("/" )
    }

    void HTTPServer::run() {
        m_server.listen("0.0.0.0", m_port);
    }

    void HTTPServer::setStaticDir(const std::string_view appPath) {
        const auto appDir = std::filesystem::weakly_canonical(std::filesystem::path(appPath)).parent_path();

        std::string staticDir;
#ifdef DEBUG
        staticDir = appDir / ".." / ".." / ".." / "client" / "public";
#else
        staticDir = appDir / "public";
#endif

        m_server.set_mount_point("/", staticDir.c_str());
    }
} } }