# VS Code 复制路径格式化插件

一个VS Code扩展，用于以特定格式复制文件路径。

## 功能特性

- 复制功能路径（右键菜单）
- 复制TableID（右键菜单）  
- Quick命令执行（需安装autoquickcode）

## 安装方法

### 从VSIX安装
1. 下载最新版本的`.vsix`文件
2. 在VS Code中打开命令面板(Ctrl+Shift+P)
3. 输入"Install from VSIX"
4. 选择下载的.vsix文件

### 从源码安装
```bash
npm install
npm run compile
vsce package
```