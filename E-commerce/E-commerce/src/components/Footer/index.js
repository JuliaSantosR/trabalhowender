import React from 'react';
import * as S from './style';
import { FaCreditCard, FaTruck, FaWhatsapp, FaConnectdevelop } from 'react-icons/fa'

export default function Footer() {
  return (
    <>
      <S.Container>

        <S.ServicesFooter>
          <S.Service>
            <FaTruck />
            <S.TextService>
              <h1>Serviço de Entrega</h1>
              <p>Entregamos em todo país.</p>
            </S.TextService>
          </S.Service>

          <S.Service>
            <FaCreditCard />
            <S.TextService>
              <h1>Pagamento facilitado</h1>
              <p>Cartão de Crédito.</p>
            </S.TextService>
          </S.Service>

          <S.Service>
            <FaWhatsapp />
            <S.TextService>
              <h1>Compre pelo Whatsapp</h1>
              <p>Estamos sempre prontos para te atender!</p>
            </S.TextService>
          </S.Service>
        </S.ServicesFooter>

        <S.BottomFooter>
          <div className="createdBy">
            <span><FaConnectdevelop /> Desenvolvido por <strong>Julia Santos</strong></span>
          </div>
          <p>COPYRIGHT © JuliaRGRA - 2025. Todos os direitos reservados. </p>
        </S.BottomFooter>
      </S.Container>
    </>
  )
}