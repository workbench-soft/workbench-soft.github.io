import type { Arch } from '../types';

const arch: Arch = {
  summary:
    'Markdown 技能和一个规则文件，由 shell 安装脚本接入 Claude Code、Codex 和 Kimi Code。辅助脚本负责检查 CI、保存密钥和配置 MCP 网关。',
  parts: [
    { name: 'Markdown 技能', role: '每个技能写一项工作的步骤，请求提到这项工作时才载入。' },
    { name: '规则文件', role: '每个会话每一轮都会载入的工作规则。' },
    { name: 'shell 安装脚本', role: '把技能链接进每个代理，并把规则文件接入它的配置。' },
    { name: 'GitHub Actions 模板', role: 'repo-ci 复制进仓库的 Checks 和 Release workflow 以及发布关卡。' },
    { name: 'gh 和 GraphQL', role: '一次调用读取组织各仓库的 workflow 和密钥清单。' },
    { name: 'PowerShell 脚本', role: '把新的密钥值存进 GitHub，代理看不到它。' },
    { name: 'mcpproxy', role: '一个网关服务器，代替 5 个 MCP 服务器。' },
    { name: 'Python 和 TypeScript 检查', role: '检查技能的 frontmatter、链接、关键词和长度。' },
  ],
  flow: [
    '安装脚本链接技能，并把规则文件复制给每个代理。',
    '会话在每一轮载入规则文件。',
    '请求与某个技能的描述相符时，就载入这个技能。',
    '技能通过 gh、脚本和 MCP 工具操作 GitHub 和各控制台。',
    '代理交付改动，并用状态标记结束这一轮。',
  ],
  links: [
    { to: 'agent-skills', text: '公开技能先装好，这些技能从那里载入写作规则。' },
    { to: 'local-ci', text: 'repo-ci 模板在 local-ci 分配的 runner 上构建。' },
    { to: 'ci', text: '它的发布脚本与 repo-ci 模板一致。' },
    { to: 'Bitwarden', text: '每个令牌先进保险库，再通过轮换脚本存到 GitHub。' },
    { to: 'GitHub', text: '技能通过 gh 迁移仓库、添加 workflow 和保存密钥。' },
  ],
  features: {
    'Move a repo':
      'move-repo 技能让代理用 gh 找出每个指向旧地址的链接。然后它转移仓库、设为私有，并把 CI 搬到自托管 runner。',
    'CI and releases for every repo':
      'shell 脚本用一次 GraphQL 调用读取组织各仓库的 workflow。随后 repo-ci 技能按模板补上缺少的 Checks 和 Release。',
    'Rotate secrets': 'PowerShell 脚本读取每个仓库的密钥清单，用 gh 保存每个新值。值由用户复制，所以代理看不到。',
    'Workflow rules': 'Markdown 规则文件在 Claude Code、Codex 和 Kimi Code 的每一轮载入。它写明每项工作要载入的技能。',
    'MCP gateway':
      'mcpproxy 把 5 个服务器放在一个 stdio 服务器后面，每个会话有自己的数据文件夹。代理先搜索工具，再调用它。',
    Releases: 'check workflow 在 main 上通过后，发布 workflow 启动。两个 shell 脚本选出日期标签并写出说明。',
    'Feature queue': '每个会话在这台 PC 主文件夹里的看板上写一个占用文件。文件有重叠的会话会等待，然后再查一次。',
  },
};

export default arch;
