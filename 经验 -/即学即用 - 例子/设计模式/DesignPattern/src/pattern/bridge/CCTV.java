package pattern.bridge;

import javax.swing.JPanel;

public abstract class CCTV extends JPanel{

    Program programMaker;
    
    public abstract void makeProgram();
}
