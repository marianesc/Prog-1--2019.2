#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Votação na ADUF

abstencao = int(input())
a_favor = int(input())
contra = int(input())

votos_totais = abstencao+a_favor+contra
p_abstencao = (100*abstencao)/votos_totais
p_a_favor = (100*a_favor)/votos_totais
p_contra = (100*contra)/votos_totais

print ("Resultado da Votação")
print ("")
print (abstencao, "abstenções","(%.2f%%)"%p_abstencao)
print (a_favor, "a favor","(%.2f%%)"%p_a_favor)
print (contra, "contra","(%.2f%%)"%p_contra)    
