<script setup lang="ts">
interface FeatureItem {
  icon: string
  title: string
  desc: string
  link: string
  tag?: string
}

defineProps<{
  groups: Array<{
    title: string
    items: FeatureItem[]
  }>
}>()
</script>

<template>
  <div class="home-features">
    <section v-for="group in groups" :key="group.title" class="feature-section">
      <h2 class="section-title">
        <span class="title-line" />
        {{ group.title }}
        <span class="title-line" />
      </h2>
      <div class="feature-grid">
        <a
          v-for="item in group.items"
          :key="item.title"
          :href="item.link"
          class="feature-card"
        >
          <div class="card-top">
            <span class="card-icon">{{ item.icon }}</span>
            <span v-if="item.tag" class="card-tag">{{ item.tag }}</span>
          </div>
          <h3 class="card-title">{{ item.title }}</h3>
          <p class="card-desc">{{ item.desc }}</p>
          <span class="card-arrow">→</span>
        </a>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-features {
  max-width: 1152px;
  margin: 0 auto;
  padding: 1rem 24px 3rem;
}

.feature-section {
  margin-top: 2.5rem;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 1.25rem;
  letter-spacing: 0.02em;
}

.title-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--vp-c-divider, rgba(125, 125, 125, 0.2)),
    transparent
  );
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.feature-card {
  position: relative;
  display: block;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider, rgba(125, 125, 125, 0.2));
  background: var(--vp-c-bg-soft, rgba(125, 125, 125, 0.04));
  text-decoration: none;
  transition: all 0.25s ease;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 12px;
  padding: 1px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.4), rgba(6, 182, 212, 0.4));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.25s ease;
}

.feature-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
  background: var(--vp-c-bg-soft-up, rgba(125, 125, 125, 0.06));
}

.feature-card:hover::before {
  opacity: 1;
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.card-icon {
  font-size: 1.75rem;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(6, 182, 212, 0.12));
}

.card-tag {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 20px;
  color: #6366f1;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.2);
}

.card-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 6px;
}

.card-desc {
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin: 0;
}

.card-arrow {
  display: inline-block;
  margin-top: 12px;
  font-size: 0.85rem;
  color: var(--vp-c-brand, #6366f1);
  opacity: 0;
  transform: translateX(-6px);
  transition: all 0.25s ease;
}

.feature-card:hover .card-arrow {
  opacity: 1;
  transform: translateX(0);
}

@media (max-width: 960px) {
  .feature-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .home-features {
    padding: 0.5rem 16px 2rem;
  }
  .feature-grid {
    grid-template-columns: 1fr;
  }
}
</style>
