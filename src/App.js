import MainLayout from './components/MainLayout/index';
import Router from './router/index';

function App() {
  return (
    <div>
      <MainLayout>
        <Router />
      </MainLayout>
    </div>
  );
}

export default App;
