#include "CmdArguments.hpp"

#include <vector>

namespace xal { namespace utils {
    CmdArguments::CmdArguments(int argc, char** argv) {
        initialize(argc, argv);
    }

    void CmdArguments::initialize(int argc, char** argv) {
        std::vector<std::string> args(argv, argv + argc);

        for (auto it = args.begin(); it != args.end(); ++it) {
            const std::string_view arg = *it;

            if (arg.starts_with("--") || arg.starts_with("-")) {
                std::string value = "";

                if (it+1 != args.end()) {
                    const std::string_view nextArgument = *(it + 1);

                    if (!nextArgument.starts_with("--") && !nextArgument.starts_with("-")) {
                        value = nextArgument;
                    }
                }

                m_arguments.emplace(arg, value);
            } else {
                // error
            }
        }
    }

    bool CmdArguments::has(const std::string_view name) const {
        return m_arguments.contains(std::string(name));
    }

    const std::string_view CmdArguments::get(const std::string_view name) const {
        return m_arguments.at(std::string(name));
    }
} }