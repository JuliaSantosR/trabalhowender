import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom'

import { AuthContext } from '../../contexts/auth'

import { FiShoppingCart, FiSearch, FiMenu, FiLogOut } from 'react-icons/fi'
import ShopCart from '../ShopCart';

import * as S from "./styles"

export default function Header() {

  const { storageUser, user, signOut } = useContext(AuthContext)

  const [showSidebar, setShowSidebar] = useState(false);
  const [productsOnCart, setProductsOnCart] = useState([]);
  const [qtdItems, setQtdItems] = useState(0);
  const [showNav, setShowNav] = useState(false);
  const [searchProducts, setSearchProducts] = useState('')
  const [navProducts, setNavProducts] = useState(false)
  const history = useHistory();

  useEffect(() => {
    const loadCart = () => {
      const listaProducts = localStorage.getItem('products')
      setProductsOnCart(JSON.parse(listaProducts) || [])
    }
    
    loadCart()
    
    const handleStorageChange = (e) => {
      if (e.key === 'products') {
        loadCart()
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    
    const handleCartUpdate = () => {
      loadCart()
    }
    
    window.addEventListener('cartUpdated', handleCartUpdate)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('cartUpdated', handleCartUpdate)
    }
  }, [])

  useEffect(() => {
    let qtd = 0;

    productsOnCart.forEach((item, index) => {
      qtd += item.quantity
    })
    setQtdItems(qtd)
  }, [productsOnCart])

  return (
    <>
      <S.MainContainer>
        <S.ContainerLeft>
          <Link to="/"><h1>juliastore</h1></Link>
          <S.Nav>
            <li
              onMouseEnter={() => setNavProducts(true)} 
              onMouseLeave={() => setNavProducts(false)}
              className={navProducts ? 'navProducts' : 'navProductsOff'}
            >
              <span style={{cursor: 'pointer'}} onClick={() => history.push('/products')}>Produtos</span>
              <nav>
                
                <li><NavLink to="/men">Masculino</NavLink></li>
                <li><NavLink to="/women">Feminino</NavLink></li>
                <li><NavLink to="/jewelery">Joalheria</NavLink></li>
                <li><NavLink to="/eletronics">Eletrônicos</NavLink></li>
              </nav>
            </li>
            <li><NavLink to="/policy">Nossa Política</NavLink></li>
          </S.Nav>
        </S.ContainerLeft>

        <S.ContainerRight>
          <S.ContainerSearch>
            <div className="inputEmailFooter">
              <input placeholder="Buscar produtos" type="text" value={searchProducts} onChange={e => setSearchProducts(e.target.value)} />
              <Link className="iconInputEmailFooter" to={`/search/${encodeURIComponent(searchProducts)}`} >
                <FiSearch />
              </Link>
            </div>
          </S.ContainerSearch>

          <S.DivAccount>
            {user ? (
              <span>
                Olá, {user.name}
              </span>
            ) : (
              <>
                <p><Link to="/register">Registro</Link></p>
                <span>/</span>
                <p><Link to="/login">Login</Link></p>
              </>
            )}
          </S.DivAccount>

          {user ? (
            <>
              <S.SignOutButton>
                <button type="button" onClick={signOut}><FiLogOut /></button>
              </S.SignOutButton>
            </>
          ) : (
            <></>
          )}

          <FiShoppingCart onClick={() => setShowSidebar(!showSidebar)} />
          <S.Bar>{qtdItems}</S.Bar>
        </S.ContainerRight>

        <S.MenuHamburguer>
          <FiMenu onClick={() => setShowNav(!showNav)} />
          {showNav &&
            (
              <nav className={`navHamburguer ${showNav ? 'navTrue' : 'navFalse'}`}>
                {user ? <p>Olá, {user.name} <FiLogOut onClick={signOut} /> </p> : <></>}
                <div className="inputEmailFooter">
                  <input placeholder="Buscar produtos" type="text" value={searchProducts} onChange={e => setSearchProducts(e.target.value)} />
                  <Link className="iconInputEmailFooter" to={`/search/${encodeURIComponent(searchProducts)}`} >
                    <FiSearch />
                  </Link>
                </div>
                <li><Link to="/men" onClick={() => setShowNav(false)}>Masculino</Link></li>
                <li><Link to="/women" onClick={() => setShowNav(false)}>Feminino</Link></li>
                <li><Link to="/jewelery" onClick={() => setShowNav(false)}>Joalheria</Link></li>
                <li><Link to="/eletronics" onClick={() => setShowNav(false)}>Eletrônicos</Link></li>
                <li><Link to="/policy" onClick={() => setShowNav(false)}>Nossa política</Link></li>
                <li><Link to="/login" onClick={() => setShowNav(false)}>Login</Link></li>
                <li><Link to="/register" onClick={() => setShowNav(false)}>Registro</Link></li>
              </nav>)}
        </S.MenuHamburguer>

      </S.MainContainer>

      {showSidebar && <ShopCart sidebar={showSidebar} />}
    </>
  )
}
