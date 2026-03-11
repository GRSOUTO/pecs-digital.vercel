import { useState, useEffect } from 'react'
import * as LucideIcons from 'lucide-react'
import { PECS_DATA } from './data'
import type { Category, PECItem } from './data'
import './App.css'

function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('Tudo')
  const [customPecs, setCustomPecs] = useState<PECItem[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // Form State
  const [newLabel, setNewLabel] = useState('')
  const [newCategory, setNewCategory] = useState<Category>('Personalizados')
  const [newImage, setNewImage] = useState<string>('')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('custom_pecs')
    if (saved) {
      try {
        setCustomPecs(JSON.parse(saved))
      } catch (e) {
        console.error("Erro ao carregar PECs", e)
      }
    }
  }, [])

  const saveCustomPecs = (updated: PECItem[]) => {
    try {
      localStorage.setItem('custom_pecs', JSON.stringify(updated))
      setCustomPecs(updated)
      setErrorMsg(null)
    } catch (e) {
      setErrorMsg("Erro: Memória cheia. Tente usar uma imagem menor.")
    }
  }

  const categories: Category[] = ['Tudo', 'Básico', 'Ações', 'Sentimentos', 'Saúde', 'Escola', 'Pessoas', 'Personalizados']
  const allPecs = [...PECS_DATA, ...customPecs]
  const filteredData = activeCategory === 'Tudo' ? allPecs : allPecs.filter(item => item.category === activeCategory)

  const speakText = (text: string) => {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'pt-BR'
    utterance.rate = 0.9 // Um pouco mais lento para clareza
    window.speechSynthesis.speak(utterance)
  }

  const playSound = (item: PECItem) => {
    speakText(item.label)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const MAX_WIDTH = 300
        const scaleSize = MAX_WIDTH / img.width
        canvas.width = MAX_WIDTH
        canvas.height = img.height * scaleSize
        const ctx = canvas.getContext('2d')
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)
        setNewImage(canvas.toDataURL('image/jpeg', 0.7))
      }
      img.src = event.target?.result as string
    }
    reader.readAsDataURL(file)
  }

  const handleAddPec = () => {
    if (!newLabel) {
      setErrorMsg("Por favor, digite um nome para a figura.")
      return
    }
    
    const newItem: PECItem = {
      id: Date.now().toString(),
      label: newLabel,
      category: newCategory as Exclude<Category, 'Tudo'>,
      imageUrl: newImage,
      color: '#3b82f6'
    }

    saveCustomPecs([...customPecs, newItem])
    resetForm()
  }

  const resetForm = () => {
    setNewLabel('')
    setNewImage('')
    setErrorMsg(null)
    setIsModalOpen(false)
  }

  return (
    <div className="app-container">
      <header>
        <h1>PECS Digital</h1>
        <p className="subtitle">Comunicação por Figuras e Voz Sintética</p>
      </header>

      {errorMsg && (
        <div style={{ background: '#fee2e2', color: '#ef4444', padding: '1rem', borderRadius: '12px', marginBottom: '1rem', textAlign: 'center', border: '2px solid #f87171' }}>
          {errorMsg}
        </div>
      )}

      <nav className="filters">
        {categories.map(cat => (
          <button key={cat} className={`filter-btn ${activeCategory === cat ? 'active' : ''}`} onClick={() => setActiveCategory(cat)}>
            {cat}
          </button>
        ))}
      </nav>

      <main className="cards-grid">
        {filteredData.map(item => {
          // @ts-ignore
          const IconComponent = LucideIcons[item.iconName || 'HelpCircle'] || LucideIcons.HelpCircle
          return (
            <button key={item.id} className="pec-card" onClick={() => playSound(item)}>
              <div className="icon-container" style={{ backgroundColor: item.color }}>
                {item.imageUrl ? <img src={item.imageUrl} alt={item.label} className="pec-image" /> : <IconComponent size={60} strokeWidth={2.5} />}
              </div>
              <span className="pec-label">{item.label}</span>
            </button>
          )
        })}
      </main>

      <button className="add-btn" onClick={() => setIsModalOpen(true)} title="Adicionar Figura">
        <LucideIcons.Plus />
      </button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 style={{ margin: '0 0 1rem 0' }}>Nova Figura</h2>
            
            <div className="form-group">
              <label>Nome (O computador lerá este texto):</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input 
                  type="text" 
                  style={{ flex: 1 }}
                  value={newLabel} 
                  onChange={(e) => setNewLabel(e.target.value)} 
                  placeholder="Ex: Quero suco" 
                />
                <button 
                  onClick={() => speakText(newLabel || "Digite algo")}
                  style={{ background: '#f1f5f9', border: 'none', borderRadius: '8px', padding: '0 12px', cursor: 'pointer' }}
                  title="Ouvir como fica"
                >
                  <LucideIcons.Volume2 size={24} color="#3b82f6" />
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Categoria:</label>
              <select value={newCategory} onChange={(e) => setNewCategory(e.target.value as Category)}>
                {categories.filter(c => c !== 'Tudo').map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Imagem da Figura:</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
              {newImage && <img src={newImage} alt="Preview" style={{ width: 80, height: 80, borderRadius: 8, marginTop: 5, objectFit: 'cover', border: '2px solid #e2e8f0' }} />}
            </div>

            <div className="modal-actions" style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
              <button className="save-btn" onClick={handleAddPec} style={{ background: '#10b981', color: 'white', flex: 1, padding: '12px', borderRadius: '12px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>Salvar PEC</button>
              <button className="cancel-btn" onClick={resetForm} style={{ background: '#94a3b8', color: 'white', flex: 1, padding: '12px', borderRadius: '12px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      <footer style={{ marginTop: 'auto', textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
        <p>Toque na figura para o computador falar o nome dela.</p>
      </footer>
    </div>
  )
}

export default App
