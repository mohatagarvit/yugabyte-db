---
title: Build from source code on CentOS
headerTitle: Build the source code
linkTitle: Build the source
description: Build YugabyteDB from source code on CentOS.
image: /images/section_icons/index/quick_start.png
headcontent: Build the source code.
menu:
  preview:
    identifier: build-from-src-3-centos
    parent: core-database
    weight: 2912
type: docs
---

<ul class="nav nav-tabs-alt nav-tabs-yb">

  <li >
    <a href="{{< relref "./build-from-src-almalinux.md" >}}" class="nav-link">
      <i class="fa-brands fa-linux" aria-hidden="true"></i>
      AlmaLinux
    </a>
  </li>

  <li >
    <a href="{{< relref "./build-from-src-macos.md" >}}" class="nav-link">
      <i class="fa-brands fa-apple" aria-hidden="true"></i>
      macOS
    </a>
  </li>

  <li >
    <a href="{{< relref "./build-from-src-centos.md" >}}" class="nav-link active">
      <i class="fa-brands fa-linux" aria-hidden="true"></i>
      CentOS
    </a>
  </li>

  <li >
    <a href="{{< relref "./build-from-src-ubuntu.md" >}}" class="nav-link">
      <i class="fa-brands fa-linux" aria-hidden="true"></i>
      Ubuntu
    </a>
  </li>

</ul>

{{< note title="Note" >}}

AlmaLinux 8 is the recommended Linux development platform for YugabyteDB.

{{< /note >}}

The following instructions are for CentOS 7.

## Install necessary packages

Update and install basic development packages as follows:

```sh
sudo yum update -y
sudo yum groupinstall -y 'Development Tools'
sudo yum install -y centos-release-scl epel-release git libatomic rsync which
```

### /opt/yb-build

{{% readfile "includes/opt-yb-build.md" %}}

### Python 3

{{% readfile "includes/python.md" %}}

The following example installs Python 3.8.

```sh
sudo yum -y install rh-python38
# Also add the following line to your .bashrc or equivalent.
source /opt/rh/rh-python38/enable
```

### CMake 3

{{% readfile "includes/cmake.md" %}}

The package manager has that, but we still need to link the name `cmake` to `cmake3`.
Do similarly for `ctest`.

```sh
sudo yum install -y cmake3
sudo ln -s /usr/bin/cmake3 /usr/local/bin/cmake
sudo ln -s /usr/bin/ctest3 /usr/local/bin/ctest
```

### Java

{{% readfile "includes/java.md" %}}

Install the following packages to satisfy the preceding requirements:

```sh
sudo yum install -y java-1.8.0-openjdk rh-maven35
# Also add the following line to your .bashrc or equivalent.
source /opt/rh/rh-maven35/enable
```

### yugabyted-ui

{{% readfile "includes/yugabyted-ui.md" %}}

```sh
sudo yum install -y npm golang
```

### Ninja (optional)

{{% readfile "includes/ninja.md" %}}

```sh
sudo yum install -y ninja-build
```

### Ccache (optional)

{{% readfile "includes/ccache.md" %}}

```sh
sudo yum install -y ccache
# Also add the following line to your .bashrc or equivalent.
export YB_CCACHE_DIR="$HOME/.cache/yb_ccache"
```

### GCC (optional)

To compile with GCC, install the following packages, and adjust the version numbers to match the GCC version you plan to use.

```sh
sudo yum install -y devtoolset-11 devtoolset-11-libatomic-devel
```

## Build the code

{{% readfile "includes/build-the-code.md" %}}

### Build release package (optional)

Perform the following steps to build a release package:

1. [Satisfy requirements for building yugabyted-ui](#yugabyted-ui).
1. Run the `yb_release` script using the following command:

   ```sh
   ./yb_release
   ```

   ```output.sh
   ......
   2023-02-10 23:19:46,459 [yb_release.py:299 INFO] Generated a package at '/home/user/code/yugabyte-db/build/yugabyte-2.17.2.0-44b735cc69998d068d561f4b6f337b318fbc2424-release-clang15-centos-x86_64.tar.gz'
   ```

{{% readfile "includes/ulimit.md" %}}
