import React, { useState } from 'react';
import '../styles/Sidebar.css';

function Sidebar() {
  const [expandedMenus, setExpandedMenus] = useState({
    services: false,
    invoices: true
  });

  const toggleMenu = (menu) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">📊</div>
        <div className="user-info">
          <div className="user-name">Anurag Yadav</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-item">
          <span>Dashboard</span>
        </div>
        
        <div className="nav-item">
          <span>Nexus</span>
        </div>
        
        <div className="nav-item">
          <span>Intake</span>
        </div>

        <div className="nav-group">
          <div className="nav-item expandable" onClick={() => toggleMenu('services')}>
            <span>Services</span>
            <span className={`chevron ${expandedMenus.services ? 'open' : ''}`}>▼</span>
          </div>
          {expandedMenus.services && (
            <div className="nav-submenu">
              <div className="nav-subitem">Pre-active</div>
              <div className="nav-subitem">Active</div>
              <div className="nav-subitem">Blocked</div>
              <div className="nav-subitem">Closed</div>
            </div>
          )}
        </div>

        <div className="nav-group">
          <div className="nav-item expandable" onClick={() => toggleMenu('invoices')}>
            <span>Invoices</span>
            <span className={`chevron ${expandedMenus.invoices ? 'open' : ''}`}>▼</span>
          </div>
          {expandedMenus.invoices && (
            <div className="nav-submenu">
              <div className="nav-subitem active">Proforma Invoices</div>
              <div className="nav-subitem">Final Invoices</div>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
