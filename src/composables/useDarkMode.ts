import { ref, watchEffect } from "vue"


export const useDarkMode = () => {
    const isDark = ref(false)

    const toggleDark = () => {
        isDark.value = !isDark.value
    }

    watchEffect(() => {
        if (isDark.value) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
    })

    return { isDark, toggleDark}
}