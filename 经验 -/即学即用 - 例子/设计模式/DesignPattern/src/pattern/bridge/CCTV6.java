package pattern.bridge;

import java.awt.BorderLayout;
import java.awt.Font;
import java.util.List;

import javax.swing.JLabel;

public class CCTV6 extends CCTV implements Runnable {

    private static final long serialVersionUID = 1L;
    
    JLabel showFilm;
    Thread thread;
    List<String> content;

    public CCTV6(Program program) {
        this.programMaker = program;
        setLayout(new BorderLayout());
        showFilm = new JLabel("CCTV6体育频道");
        showFilm.setFont(new Font("", Font.BOLD, 39));
        add(showFilm, BorderLayout.CENTER);
        thread = new Thread(this);
    }

    @Override
    public void run() {
        for (int i = 0; i < content.size(); i++) {
            showFilm.setText(content.get(i));
            try {
                Thread.sleep(1500);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public void makeProgram() {
        content = programMaker.makeTVProgram();
        if (!thread.isAlive()) {
            thread = new Thread(this);
            thread.start();
        }
    }

}
