import { Frame, Page } from '@shopify/polaris';
import './App.css';
import { AppHeader } from './Components/AppHeader';
import { MainApp } from './Components/MainApp';
function App() {

  return (
    <Frame>
      <Page
        narrowWidth
      >
        <AppHeader></AppHeader>
        <MainApp></MainApp>
      </Page>
    </Frame>
  )
}

export default App
