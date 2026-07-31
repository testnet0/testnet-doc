<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  title?: string
  prompt?: string
  command?: string
  copyLabel?: string
  copiedLabel?: string
  hint?: string
}>()

const title = props.title ?? 'bash'
const prompt = props.prompt ?? '$'
const command = props.command ?? 'curl -fsSL https://cnb.cool/testnet0/testnet-public/-/git/raw/main/install.sh | bash'
const hint = props.hint ?? '一行命令，即刻部署'
const copyLabel = props.copyLabel ?? '复制命令'
const copiedLabel = props.copiedLabel ?? '已复制'

const displayed = ref('')
const copied = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

onMounted(() => {
  let i = 0
  const step = () => {
    if (i <= command.length) {
      displayed.value = command.slice(0, i)
      i++
      timer = setTimeout(step, i === 1 ? 280 : 28 + Math.random() * 50)
    } else {
      timer = setTimeout(() => { displayed.value = ''; i = 0; step() }, 6000)
    }
  }
  step()
})

onUnmounted(() => { if (timer) clearTimeout(timer) })

const copy = async () => {
  try {
    await navigator.clipboard.writeText(command)
  } catch {
    const ta = document.createElement('textarea')
    ta.value = command
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
  }
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}
</script>

<template>
  <div class="install-terminal-wrap">
    <div class="install-hint">
      <span class="hint-badge">⚡ {{ hint }}</span>
    </div>
    <div class="install-terminal">
      <div class="terminal-bar">
        <span class="dot red" />
        <span class="dot yellow" />
        <span class="dot green" />
        <span class="terminal-title">{{ title }}</span>
        <button class="copy-btn" :title="copyLabel" @click="copy">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          <span>{{ copied ? copiedLabel : copyLabel }}</span>
        </button>
      </div>
      <div class="terminal-body">
        <span class="prompt">{{ prompt }}</span>
        <span class="cmd">{{ displayed }}<span class="cursor">▋</span></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.install-terminal-wrap {
  position: relative;
  margin: 2.5rem auto 0;
  max-width: 960px;
}

/* 光晕背景 */
.install-terminal-wrap::before {
  content: '';
  position: absolute;
  inset: -20px -10px;
  background: radial-gradient(
    ellipse at center,
    rgba(99, 102, 241, 0.18),
    rgba(6, 182, 212, 0.08) 40%,
    transparent 70%
  );
  filter: blur(20px);
  z-index: -1;
  border-radius: 30px;
}

.install-terminal {
  border-radius: 14px;
  overflow: hidden;
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.28),
    0 0 0 1px rgba(99, 102, 241, 0.25);
  background: #0d1117;
  border: 1px solid rgba(99, 102, 241, 0.2);
}

.terminal-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: #161b22;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.dot {
  width: 13px;
  height: 13px;
  border-radius: 50%;
  flex-shrink: 0;
}
.dot.red { background: #ff5f56; }
.dot.yellow { background: #ffbd2e; }
.dot.green { background: #27c93f; }

.terminal-title {
  flex: 1;
  text-align: center;
  font-size: 12px;
  color: #8b949e;
  font-family: ui-monospace, "SFMono-Regular", "Menlo", monospace;
}

.copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: #8b949e;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 7px;
  padding: 4px 10px;
  cursor: pointer;
  transition: all 0.18s ease;
}
.copy-btn:hover {
  color: #c9d1d9;
  background: rgba(99, 102, 241, 0.22);
  border-color: rgba(99, 102, 241, 0.5);
}

.terminal-body {
  padding: 24px 20px 26px;
  font-family: ui-monospace, "SFMono-Regular", "Menlo", "Consolas", monospace;
  font-size: 14.5px;
  line-height: 1.75;
  overflow-x: hidden;
  white-space: pre-wrap;
  word-break: break-all;
}

.prompt {
  color: #27c93f;
  margin-right: 10px;
  user-select: none;
  font-weight: 600;
}

.cmd {
  color: #e6edf3;
}

.cursor {
  color: #6366f1;
  animation: blink 1s steps(1) infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}

.install-hint {
  margin: 0 0 16px;
  text-align: center;
}

.hint-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 600;
  padding: 6px 18px;
  border-radius: 20px;
  color: var(--vp-c-brand, #6366f1);
  background: var(--vp-c-brand-soft, rgba(99, 102, 241, 0.1));
  border: 1px solid var(--vp-c-brand-soft, rgba(99, 102, 241, 0.25));
  letter-spacing: 0.03em;
}

@media (max-width: 640px) {
  .install-terminal-wrap {
    margin: 1.5rem auto 0;
  }
  .terminal-body {
    font-size: 12.5px;
    padding: 18px 14px 20px;
  }
  .hint-badge {
    font-size: 13px;
    padding: 5px 14px;
  }
}
</style>
