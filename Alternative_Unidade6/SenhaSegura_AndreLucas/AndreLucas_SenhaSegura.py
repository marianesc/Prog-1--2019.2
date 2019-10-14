# UFCG - Programação 1 - 2019.2
# André Lucas Medeiros Martins - 119210592
# Senha Segura

def senha_segura(senha):
    if len(senha) < 4:
        return 'Senha insegura'
    else:
        for indice in range(len(senha)):

            if (indice + 1)%2 == 0:
                if int(senha[indice])%2 != 0:
                    return 'Senha insegura'

            else:
                if int(senha[indice])%2 != 1:
                    return 'Senha insegura'    
    
        return 'Senha segura'

#print(senha_segura(input()))
