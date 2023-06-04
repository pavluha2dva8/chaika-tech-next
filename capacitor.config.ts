import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'chaika-tech-next',
  webDir: 'out',
  server: {
    url: 'http://192.168.88.160:3000',
    cleartext: true,
  },
}

export default config
