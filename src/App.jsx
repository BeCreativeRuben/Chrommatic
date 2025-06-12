import Hero from './components/Hero'
import Releases from './components/Releases'

function App() {
    return (
        <div className="min-h-screen bg-black text-white font-sans">
            <Hero />
            <Releases />
            <footer className="p-4 text-center text-sm text-gray-400">
                &copy; {new Date().getFullYear()} Chromattic
            </footer>
        </div>
    );
}

export default App;
