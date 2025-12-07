import { useState } from 'react';
import '../styles/Sidebar.css';

function Sidebar() {
  const [expandedMenus, setExpandedMenus] = useState({
    services: false,
    invoices: true
  });

  const [activeItem, setActiveItem] = useState('proforma-invoices');

  const toggleMenu = (menu) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const handleNavClick = (itemId) => {
    setActiveItem(itemId);
    console.log(`Navigating to: ${itemId}`);
    // Add your navigation logic here
    // For example: navigate(`/${itemId}`);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">V</div>
        <div className="brand-info">
          <div className="brand-name">Vault</div>
          <div className="user-name">Anurag Yadav</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div 
          className={`nav-item ${activeItem === 'dashboard' ? 'active' : ''}`}
          onClick={() => handleNavClick('dashboard')}
        >
          <span className="nav-icon">📊</span>
          <span className="nav-label">Dashboard</span>
        </div>
        
        <div 
          className={`nav-item ${activeItem === 'nexus' ? 'active' : ''}`}
          onClick={() => handleNavClick('nexus')}
        >
          <span className="nav-icon">🔗</span>
          <span className="nav-label">Nexus</span>
        </div>
        
        <div 
          className={`nav-item ${activeItem === 'intake' ? 'active' : ''}`}
          onClick={() => handleNavClick('intake')}
        >
          <span className="nav-icon">📥</span>
          <span className="nav-label">Intake</span>
        </div>

        <div className="nav-group">
          <div className="nav-item expandable" onClick={() => toggleMenu('services')}>
            <span className="nav-icon">⚙️</span>
            <span className="nav-label">Services</span>
            <span className={`chevron ${expandedMenus.services ? 'open' : ''}`}>▼</span>
          </div>
          {expandedMenus.services && (
            <div className="nav-submenu">
              <div 
                className={`nav-subitem ${activeItem === 'pre-active' ? 'active' : ''}`}
                onClick={() => handleNavClick('pre-active')}
              >
                Pre-active
              </div>
              <div 
                className={`nav-subitem ${activeItem === 'active' ? 'active' : ''}`}
                onClick={() => handleNavClick('active')}
              >
                Active
              </div>
              <div 
                className={`nav-subitem ${activeItem === 'blocked' ? 'active' : ''}`}
                onClick={() => handleNavClick('blocked')}
              >
                Blocked
              </div>
              <div 
                className={`nav-subitem ${activeItem === 'closed' ? 'active' : ''}`}
                onClick={() => handleNavClick('closed')}
              >
                Closed
              </div>
            </div>
          )}
        </div>

        <div className="nav-group">
          <div className="nav-item expandable" onClick={() => toggleMenu('invoices')}>
            <span className="nav-icon">📄</span>
            <span className="nav-label">Invoices</span>
            <span className={`chevron ${expandedMenus.invoices ? 'open' : ''}`}>▼</span>
          </div>
          {expandedMenus.invoices && (
            <div className="nav-submenu">
              <div 
                className={`nav-subitem ${activeItem === 'proforma-invoices' ? 'active' : ''}`}
                onClick={() => handleNavClick('proforma-invoices')}
              >
                Proforma Invoices
              </div>
              <div 
                className={`nav-subitem ${activeItem === 'final-invoices' ? 'active' : ''}`}
                onClick={() => handleNavClick('final-invoices')}
              >
                Final Invoices
              </div>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
