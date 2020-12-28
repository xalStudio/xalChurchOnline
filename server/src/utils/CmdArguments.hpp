#pragma once

#include <string>
#include <string_view>
#include <unordered_map>

namespace xal { namespace utils {
    class CmdArguments {
    public:
        CmdArguments() = default;
        CmdArguments(int argc, char** argv);

        void initialize(int argc, char** argv);

        bool                   has(const std::string_view name) const;
        const std::string_view get(const std::string_view name) const;

    private:
        std::unordered_map<std::string, std::string> m_arguments;
    };
} }