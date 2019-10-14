import unittest
import sys

undertest = __import__(sys.argv[-1].split(".py")[0])
move_direita = getattr(undertest, 'move_direita', None)

class PublicTests(unittest.TestCase):

    def test_1(self):
        labirinto1 = [
          ['P', '*', ' ', ' '],
          ['P', ' ', 'P', ' '],
          ['P', 'P', 'P', ' '],
        ]

        assert move_direita(labirinto1) == (0, 2)
        assert labirinto1 ==  [
          ['P', ' ', '*', ' '],
          ['P', ' ', 'P', ' '],
          ['P', 'P', 'P', ' '],
        ]

    def test_2(self):
        labirinto2 = [
          ['P', 'P', ' ', ' '],
          ['P', '*', 'P', ' '],
          ['P', 'P', 'P', ' '],
        ]
        assert move_direita(labirinto2) == (1, 1)
        
if __name__ == '__main__':
    loader = unittest.TestLoader()
    runner = unittest.TextTestRunner()
    runner.run(loader.loadTestsFromModule(sys.modules[__name__]))
