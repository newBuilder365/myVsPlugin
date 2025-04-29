import * as vscode from 'vscode';
import { formatPath, formatTableId } from './utils/pathFormatter';
import { exec } from 'child_process';
const { execSync } = require('child_process');

export function activate(context: vscode.ExtensionContext) {
    // 注册复制功能路径命令
    let copyPathDisposable = vscode.commands.registerCommand('copyFilePath', async (uri: vscode.Uri) => {
        if (uri && uri.fsPath) {
            const formattedPath = formatPath(uri.fsPath);
            await vscode.env.clipboard.writeText(formattedPath);
            vscode.window.showInformationMessage('文件路径已复制到剪贴板: ' + formattedPath);
        }
    });

    // 注册复制TableId命令
    let copyTableIdDisposable = vscode.commands.registerCommand('copyTableId', async (uri: vscode.Uri) => {
        if (uri && uri.fsPath) {
            const tableId = formatTableId(uri.fsPath);
            await vscode.env.clipboard.writeText(tableId);
            vscode.window.showInformationMessage('TableId已复制到剪贴板: ' + tableId);
        }
    });

    // 注册quickCopyPath命令
    let quickCopyDisposable = vscode.commands.registerCommand('quickCopyPath', async (uri: vscode.Uri) => {
        if (!uri || !uri.fsPath) {
            vscode.window.showErrorMessage('未获取到有效文件路径');
            return;
        }
        
        try {
            // 获取相对于工作区的路径
            const workspaceFolders = vscode.workspace.workspaceFolders;
            if (!workspaceFolders) {
                vscode.window.showErrorMessage('未打开工作区');
                return;
            }
            
            const relativePath = vscode.workspace.asRelativePath(uri);
            
            await vscode.env.clipboard.writeText(relativePath);
            
            const terminal = vscode.window.activeTerminal || vscode.window.createTerminal();
            terminal.show();
            terminal.sendText(`quick --subDir "${relativePath}"`);
            
            vscode.window.showInformationMessage('命令已发送到终端执行');
        } catch (err: any) {
            vscode.window.showErrorMessage(`操作失败: ${err.message}`);
        }
    });

    context.subscriptions.push(quickCopyDisposable);
    context.subscriptions.push(copyPathDisposable);
    context.subscriptions.push(copyTableIdDisposable);
}

export function deactivate() {}