n = int(input())
inv = 0 
v=0 
m = 'dado inconsistente.'
neg = 0 
for i in range(n): 
    (p, c, a) = [int(num) for num in input().split(' ')] 
    
    if p>0 and neg==0:
        v+=1
    else:
        neg=1
    if c>0 and neg==0:
        v+=1
    else:
        neg=1
    if a>0 and neg==0:
        v+=1
    else:
        neg=1
    if inv==0: 
        if p<0: 
            print('{} peso negativo.'.format(m)) 
            inv=1 
        elif c<0: 
            print('{} combustível negativo.'.format(m)) 
            inv=1 
        elif a<0: 
            print('{} altitude negativa.'.format(m)) 
            inv=1 
        
        
print('{} dados válidos.' .format(v))
