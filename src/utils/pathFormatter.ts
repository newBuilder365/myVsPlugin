export function formatPath(filePath: string): string {
    // 使用正则表达式精确匹配"project"目录
    const projectRegex = /[\\\/]project[\\\/]/i;
    const lastProjectMatch = filePath.match(new RegExp(`.*${projectRegex.source}`));
    
    if (lastProjectMatch) {
        // 提取从最后一个project目录开始的部分
        const matchedPath = lastProjectMatch[0];
        const remainingPath = filePath.substring(matchedPath.length);
        return `project/${remainingPath.replace(/\\/g, '/')}`;
    }
    // 如果没有找到project，返回原始路径（保持原有处理逻辑）
    return filePath.replace(/\\/g, '/');
}

export function formatTableId(filePath: string): string {
    // 1. 查找"modules"在路径中的位置
    const modulesIndex = filePath.indexOf('modules');
    if (modulesIndex !== -1) {
        // 2. 提取从modules之后的部分
        const relativePath = filePath.substring(modulesIndex + 'modules'.length + 1);
        // 3. 移除文件扩展名
        const pathWithoutExt = relativePath.replace(/\.[^\.]+$/, '');
        // 4. 替换所有反斜杠为下划线
        return pathWithoutExt.replace(/[\\\/]/g, '_');
    }
    // 如果路径中不包含modules，保持原有处理逻辑
    return filePath.replace(/\\/g, '_').replace(/\.[^\.]+$/, '');
}
