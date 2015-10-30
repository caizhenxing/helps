package pattern.bridge;

import java.util.ArrayList;
import java.util.List;

public class FilmProgram implements Program {

    List<String> content;

    FilmProgram() {
        content = new ArrayList<String>();
    }

    @Override
    public List<String> makeTVProgram() {
        content.clear();
        content.add("地道战");
        content.add("鬼子进村");
        content.add("地道战");
        content.add("打鬼子");
        content.add("鬼子被消灭了");
        return content;
    }
}
