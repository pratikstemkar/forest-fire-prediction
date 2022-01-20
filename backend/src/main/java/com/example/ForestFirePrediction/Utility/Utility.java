package com.example.ForestFirePrediction.Utility;

import javax.imageio.ImageIO;
import java.awt.*;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Utility {

    public static double round(double value, int places) {
        if (places < 0) throw new IllegalArgumentException();

        BigDecimal bd = BigDecimal.valueOf(value);
        bd = bd.setScale(places, RoundingMode.HALF_UP);
        return bd.doubleValue();
    }

    public Boolean checkEmail(String email){
        String regex = "^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$";
        Pattern pattern = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);

        Matcher matcher = pattern.matcher(email);

        return matcher.matches();
    }

    public Boolean checkUsername(String username){
        String regex = "^[a-z0-9_-]{3,15}$";
        Pattern pattern = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);

        Matcher matcher = pattern.matcher(username.toLowerCase());

        return matcher.matches();
    }

    public int getUrlStatus(String url) throws IOException {
        URL urlX = new URL(url);
        HttpURLConnection huc = (HttpURLConnection) urlX.openConnection();

        int responseCode = huc.getResponseCode();

        return responseCode;
    }

    public Boolean checkImage(String url) throws IOException {
        Image image = ImageIO.read(new URL(url));
        return image != null;
    }
}
