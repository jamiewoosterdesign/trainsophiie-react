tailwind.config = {
    theme: {
        extend: {
            colors: {
                brand: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                    900: '#1e3a8a',
                },
                slate: {
                    800: '#1e293b',
                    900: '#0f172a',
                    950: '#020617', // Deeper navy for sidebar
                }
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-out',
                'pop-in': 'popIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(5px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                popIn: {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                }
            }
        }
    }
}
