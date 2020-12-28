cmake_minimum_required (VERSION 3.5)
project(xalChurchOnline)

if(NOT CMAKE_BUILD_TYPE)
  set(CMAKE_BUILD_TYPE Release)
endif()

message(${CMAKE_BUILD_TYPE})
if(CMAKE_BUILD_TYPE MATCHES Debug)
  add_compile_definitions(DEBUG)
endif()

#add_subdirectory(${PROJECT_SOURCE_DIR}/extlibs/rapidyaml ryml)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_FLAGS "-Wall -Wextra")
set(CMAKE_CXX_FLAGS_DEBUG "-g")
set(CMAKE_CXX_FLAGS_RELEASE "-O3")

include_directories("${PROJECT_SOURCE_DIR}/src")
include_directories("${PROJECT_SOURCE_DIR}/external_libs/websocketpp")
include_directories("${PROJECT_SOURCE_DIR}/external_libs/asio/asio/include")
include_directories("${PROJECT_SOURCE_DIR}/external_libs/json/include")
include_directories("${PROJECT_SOURCE_DIR}/external_libs/cpp-httplib")
include_directories(/usr/include/lua5.4/)

set(
  SOURCES
  "${PROJECT_SOURCE_DIR}/src/network/websocket/WebsocketServer.cpp"
  "${PROJECT_SOURCE_DIR}/src/network/http/HTTPServer.cpp"
  "${PROJECT_SOURCE_DIR}/src/utils/CmdArguments.cpp"
  "${PROJECT_SOURCE_DIR}/src/main.cpp"
)

IF(CMAKE_BUILD_TYPE MATCHES DEBUG)
  add_compile_definitions(DEBUG=1)
ENDIF(CMAKE_BUILD_TYPE MATCHES DEBUG)

if(WIN32) # Check if we are on Windows
  if( ${CMAKE_SYSTEM_VERSION} EQUAL 10)
    add_compile_definitions(_WIN32_WINNT=0x0A00)
  endif()
elseif(UNIX)
  # Nothing special required
else()
  message(SEND_ERROR "You are on an unsupported platform! (Not Win32, Mac OS X or Unix)")
endif(WIN32)

if("${CMAKE_CXX_COMPILER_ID}" STREQUAL "GNU")
    set(USING_GCC TRUE)
elseif("${CMAKE_CXX_COMPILER_ID}" STREQUAL "Clang")
    set(USING_CLANG TRUE)
endif()

if(USING_GCC OR USING_CLANG)
  add_compile_options(-std=c++20 -g -pedantic -Wall -Wl,-rpath)
endif()

#set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${PROJECT_SOURCE_DIR}/bin)

add_executable(
    "xalChurchOnline"
    ${SOURCES}
)

target_link_libraries("xalChurchOnline" pthread stdc++fs)