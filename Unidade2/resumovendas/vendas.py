#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Resumo das Vendas


brinquedos_loja = int(input())
brinquedos_t = int(input())
brinquedos_c = int(input())

brinquedos_j = brinquedos_loja - (brinquedos_t + brinquedos_c)
p_brinquedos_t = (100*brinquedos_t)/brinquedos_loja
p_brinquedos_c = (100*brinquedos_c)/brinquedos_loja
p_brinquedos_j = (100*brinquedos_j)/brinquedos_loja

print("Teresa vendeu {0} (de {1}) brinquedos. ({2:.2f}%)".format(brinquedos_t,brinquedos_loja,p_brinquedos_t))
print("Joaquim vendeu {0} (de {1}) brinquedos. ({2:.2f}%)".format(brinquedos_j,brinquedos_loja,p_brinquedos_j))
print("Carla vendeu {0} (de {1}) brinquedos. ({2:.2f}%)".format(brinquedos_c,brinquedos_loja,p_brinquedos_c))
