# UFCG - Programação 1 - 2019.2
# André Lucas Medeiros Martins - 119210592
# Inverte 2 a 2

def inverte2a2_condicional(seq):
    tamanho = len(seq) - 1
    
    for indice in range(0,tamanho, 2):
        if seq[indice] > seq[indice +1]:
            seq[indice],seq[indice+1] = seq[indice+1],seq[indice]

#seq = list(map(int,input().split()))
#inverte2a2_condicional(seq)
#print(seq)
  
